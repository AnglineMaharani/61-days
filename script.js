document.addEventListener('DOMContentLoaded', () => {


    // =====================================
    // ELEMENT
    // =====================================


    const triggerOverlay =
        document.getElementById('triggerOverlay');


    const startButton =
        document.getElementById('startButton');


    const loadingBar =
        document.getElementById('loadingBar');


    const statusText =
        document.getElementById('statusText');


    const ambientLight =
        document.getElementById('ambientLight');


    const roseWrapper =
        document.getElementById('roseWrapper');


    const roseHead =
        document.getElementById('roseHead');


    const calyx =
        document.getElementById('calyx');


    const stem =
        document.getElementById('stem');


    const leafLeft =
        document.getElementById('leafLeft');


    const leafRight =
        document.getElementById('leafRight');


    const endText =
        document.getElementById('endText');


    const fallingPetalsEl =
        document.getElementById('fallingPetals');



    // NOTES

    const noteButton =
        document.getElementById('noteButton');


    const notePanel =
        document.getElementById('notePanel');


    const backButton =
        document.getElementById('backButton');



    // MUSIC

    const bgMusic =
        document.getElementById('bgMusic');





    // =====================================
    // VARIABLES
    // =====================================


    let petalSparkInterval = null;

    let fallingPetalInterval = null;




    // =====================================
    // PETAL CONFIG
    // =====================================


    const PETAL_LAYERS = [


        {
            count:4,
            w:24,
            h:46,
            curl:78,
            delayBase:0,
            tz:2,
            cls:'petal-bud'
        },


        {
            count:5,
            w:34,
            h:58,
            curl:65,
            delayBase:0.25,
            tz:9,
            cls:'petal-core'
        },


        {
            count:6,
            w:46,
            h:72,
            curl:48,
            delayBase:0.55,
            tz:18,
            cls:'petal-inner'
        },


        {
            count:7,
            w:58,
            h:88,
            curl:22,
            delayBase:0.90,
            tz:30,
            cls:'petal-mid-inner'
        },


        {
            count:8,
            w:72,
            h:104,
            curl:-5,
            delayBase:1.30,
            tz:44,
            cls:'petal-mid'
        },


        {
            count:9,
            w:86,
            h:118,
            curl:-25,
            delayBase:1.75,
            tz:60,
            cls:'petal-outer'
        },


        {
            count:10,
            w:98,
            h:130,
            curl:-48,
            delayBase:2.25,
            tz:76,
            cls:'petal-blush'
        }

    ];



    const SEPALS_COUNT = 5;




    const FALLING_PETAL_COLORS = [

        ['#9a001d','#3d0008'],

        ['#850018','#2b0005'],

        ['#ad0022','#480008'],

        ['#bf0028','#52000c']

    ];







    // =====================================
    // LOADING CARD
    // =====================================


    function startCardLoader(){


        const duration = 2400;



        const steps = [


            {
                threshold:20,
                text:'Loading Love.css...'
            },


            {
                threshold:50,
                text:'Growing digital petals...'
            },


            {
                threshold:80,
                text:'Adding velvet textures...'
            },


            {
                threshold:95,
                text:'Optimizing 3D rendering...'
            },


            {
                threshold:100,
                text:'Ready to bloom!'
            }

        ];



        let startTimestamp=null;



        function animateLoader(timestamp){


            if(!startTimestamp)
                startTimestamp=timestamp;



            const progress =
            Math.min(
                (timestamp-startTimestamp)/duration,
                1
            );



            const percent =
            Math.floor(progress*100);



            loadingBar.style.width =
            `${percent}%`;



            const active =
            steps.find(
                s=>percent<=s.threshold
            )
            ||
            steps[steps.length-1];



            statusText.textContent =
            active.text;



            if(progress<1){


                requestAnimationFrame(
                    animateLoader
                );


            }
            else{


                startButton.removeAttribute(
                    'disabled'
                );


            }


        }



        requestAnimationFrame(
            animateLoader
        );


    }







    // =====================================
    // BACKGROUND BLINK STARS
    // =====================================


    function createBackgroundStars(){


        const layer =
        document.createElement('div');


        layer.className =
        'bg-stars';



        document.body.appendChild(
            layer
        );



        const types = [

            'star-dot',

            'star-cross',

            'star-diamond'

        ];



        for(let i=0;i<60;i++){


            const star =
            document.createElement('div');



            star.className =
            `bg-star ${
                types[
                    Math.floor(
                        Math.random()*
                        types.length
                    )
                ]
            }`;



            star.style.left =
            `${Math.random()*100}%`;



            star.style.top =
            `${Math.random()*100}%`;



            star.style.setProperty(
                '--delay',
                `${Math.random()*4}s`
            );



            star.style.setProperty(
                '--dur',
                `${2+Math.random()*3}s`
            );



            star.style.setProperty(
                '--size',
                `${2+Math.random()*5}px`
            );



            layer.appendChild(
                star
            );


        }


    }





    function startBackgroundStars(){


        document
        .querySelectorAll('.bg-star')
        .forEach(
            (star,index)=>{


                setTimeout(()=>{


                    star.classList.add(
                        'active'
                    );


                },index*20);


            }
        );


    }
    // =====================================
    // CREATE SEPALS
    // =====================================


    function createSepals(){


        const step =
        360 / SEPALS_COUNT;



        for(let i=0;i<SEPALS_COUNT;i++){


            const sepal =
            document.createElement('div');


            sepal.className =
            'sepal';



            const angle =
            i * step +
            (Math.random()-0.5)*5;



            const delay =
            0.3 + i*0.06;



            const curl =
            18 + Math.random()*8;



            sepal.style.setProperty(
                '--sepal-angle',
                `${angle}deg`
            );


            sepal.style.setProperty(
                '--sepal-curl',
                `${curl}deg`
            );


            sepal.style.setProperty(
                '--sepal-delay',
                `${delay}s`
            );


            calyx.appendChild(
                sepal
            );


        }


    }







    // =====================================
    // CREATE PETALS
    // =====================================


    function createPetals(){


        PETAL_LAYERS.forEach(
        (layer,li)=>{


            const angleStep =
            360 / layer.count;



            const layerOffset =
            li*24 +
            (Math.random()-0.5)*8;



            for(let i=0;i<layer.count;i++){


                const petal =
                document.createElement('div');



                petal.className =
                `petal ${layer.cls}`;



                const angle =
                layerOffset +
                i*angleStep +
                (Math.random()-0.5)*5;



                const delay =
                layer.delayBase +
                i*0.05;



                const scale =
                0.94 +
                Math.random()*0.12;



                const bloomDur =
                2.1 +
                Math.random()*0.4;



                petal.style.width =
                `${layer.w}px`;



                petal.style.height =
                `${layer.h}px`;



                petal.style.setProperty(
                    '--angle',
                    `${angle}deg`
                );


                petal.style.setProperty(
                    '--curl',
                    `${layer.curl}deg`
                );


                petal.style.setProperty(
                    '--scale',
                    scale
                );


                petal.style.setProperty(
                    '--delay',
                    `${delay}s`
                );


                petal.style.setProperty(
                    '--tz',
                    `${layer.tz}px`
                );


                petal.style.setProperty(
                    '--bloom-dur',
                    `${bloomDur}s`
                );



                roseHead.appendChild(
                    petal
                );


            }


        });


    }








    // =====================================
    // STEM GROW
    // =====================================


    function growStem(){


        return new Promise(resolve=>{


            stem.classList.add(
                'grow'
            );



            setTimeout(()=>{


                leafLeft.classList.add(
                    'visible'
                );


            },800);




            setTimeout(()=>{


                leafRight.classList.add(
                    'visible'
                );


            },1100);




            setTimeout(
                resolve,
                2200
            );


        });


    }








    // =====================================
    // PETAL SPARKLE EFFECT
    // keluar dari kelopak bunga
    // =====================================


    function spawnPetalSpark(){


    const rect =
    roseWrapper.getBoundingClientRect();



    const spark =
    document.createElement('div');


    spark.className =
    "petal-spark";



    // titik keluar dari kelopak

    const x =
    rect.left +
    rect.width/2 +
    (-45 + Math.random()*90);



    const y =
    rect.top +
    120 +
    (-20 + Math.random()*30);



    spark.style.left =
    `${x}px`;



    spark.style.top =
    `${y}px`;



    const colors = [

        "rgba(255,35,90,.9)",

        "rgba(255,90,150,.85)",

        "rgba(255,160,180,.8)",

        "rgba(220,40,80,.85)"

    ];



    spark.style.setProperty(
        "--spark-color",
        colors[
            Math.floor(
                Math.random()*colors.length
            )
        ]
    );



    spark.style.setProperty(
        "--spark-size",
        `${2+Math.random()*6}px`
    );



    spark.style.setProperty(
        "--spark-time",
        `${1.5+Math.random()*1.5}s`
    );



    spark.style.setProperty(
        "--move-x1",
        `${-10+Math.random()*20}px`
    );


    spark.style.setProperty(
        "--move-y1",
        `${-15-Math.random()*20}px`
    );



    spark.style.setProperty(
        "--move-x2",
        `${-30+Math.random()*60}px`
    );


    spark.style.setProperty(
        "--move-y2",
        `${-40-Math.random()*40}px`
    );



    spark.style.setProperty(
        "--move-x3",
        `${-50+Math.random()*100}px`
    );


    spark.style.setProperty(
        "--move-y3",
        `${-80-Math.random()*70}px`
    );



    document.body.appendChild(
        spark
    );



    setTimeout(()=>{

        spark.remove();

    },3500);

}


    function startPetalSparkles(){


        for(let i=0;i<10;i++){


            setTimeout(()=>{


                spawnPetalSpark();


            },i*100);


        }





        petalSparkInterval =
        setInterval(()=>{


            const amount =
            2 + Math.floor(
                Math.random()*3
            );



            for(let i=0;i<amount;i++){


                setTimeout(()=>{


                    spawnPetalSpark();


                },i*120);


            }



        },900);


    }








    // =====================================
    // FLOWER BLOOM
    // =====================================


    function bloom(){


        calyx.classList.add(
            'visible'
        );


        ambientLight.classList.add(
            'visible'
        );


        roseHead.classList.add(
            'blooming'
        );



        startBackgroundStars();



        // sparkle keluar dari kelopak

        startPetalSparkles();


    }








    // =====================================
    // FALLING PETALS
    // =====================================


    function spawnFallingPetal(){


        if(
            fallingPetalsEl
            .childElementCount > 10
        )
        return;



        const petal =
        document.createElement('div');



        petal.className =
        'falling-petal';



        const w =
        10 + Math.random()*12;



        const h =
        w *
        (1.25+Math.random()*0.15);



        const x =
        20+Math.random()*60;



        const y =
        3+Math.random()*10;



        const dur =
        5.5+Math.random()*3.5;



        const delay =
        Math.random()*0.6;



        const colors =
        FALLING_PETAL_COLORS[
            Math.floor(
                Math.random()*
                FALLING_PETAL_COLORS.length
            )
        ];



        petal.style.left =
        `${x}vw`;



        petal.style.top =
        `${y}vh`;



        petal.style.setProperty(
            '--fp-w',
            `${w}px`
        );



        petal.style.setProperty(
            '--fp-h',
            `${h}px`
        );



        petal.style.setProperty(
            '--fp-c1',
            colors[0]
        );



        petal.style.setProperty(
            '--fp-c2',
            colors[1]
        );



        petal.style.setProperty(
            '--f-dur',
            `${dur}s`
        );



        petal.style.setProperty(
            '--f-delay',
            `${delay}s`
        );



        petal.style.setProperty(
            '--s1',
            `${-30+Math.random()*60}px`
        );



        petal.style.setProperty(
            '--s2',
            `${-30+Math.random()*60}px`
        );



        petal.style.setProperty(
            '--s3',
            `${-30+Math.random()*60}px`
        );



        petal.style.setProperty(
            '--s4',
            `${-20+Math.random()*40}px`
        );



        fallingPetalsEl.appendChild(
            petal
        );



        setTimeout(()=>{


            if(petal.parentNode)
                petal.remove();


        },(dur+delay)*1000+300);


    }





    function startFallingPetals(){


        for(let i=0;i<3;i++){


            setTimeout(()=>{


                spawnFallingPetal();


            },i*300);


        }



        fallingPetalInterval =
        setInterval(()=>{


            spawnFallingPetal();


        },2200);


    }
// =====================================
// MAIN ANIMATION
// =====================================


async function startAnimationSequence(){


    await growStem();


    await delay(100);


    bloom();



    setTimeout(()=>{


        roseWrapper.classList.add(
            'rotating'
        );


    },2600);




    setTimeout(()=>{


        startFallingPetals();


    },3400);




    setTimeout(()=>{


        endText.classList.add(
            'visible'
        );


    },4600);




    // tombol notes muncul

    setTimeout(()=>{


        noteButton.classList.add(
            'show'
        );


    },5200);



}







function delay(ms){


    return new Promise(resolve=>

        setTimeout(resolve,ms)

    );


}







// =====================================
// NOTES BUTTON
// =====================================


noteButton.addEventListener(
    'click',
    ()=>{


        notePanel.classList.add(
            'active'
        );


    }
);






backButton.addEventListener(
    'click',
    ()=>{


        notePanel.classList.remove(
            'active'
        );


    }
);








// =====================================
// START BUTTON
// =====================================


startButton.addEventListener(
    'click',
    ()=>{


        bgMusic.volume = 0.35;



        bgMusic.play();




        triggerOverlay.classList.add(
            'fade-out'
        );




        setTimeout(()=>{


            startAnimationSequence();



        },800);



    }
);








// =====================================
// INITIALIZE
// =====================================


createSepals();


createPetals();


createBackgroundStars();




setTimeout(()=>{


    startCardLoader();



},400);



});