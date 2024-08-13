import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedText = ({ text1, text2, text3, text4 }) => {
    const textRefs = useRef([]);

    useEffect(() => {
        const texts = textRefs.current;

        // Clear previous animations
        gsap.killTweensOf(texts);

        // Define animations for each text
        const animations = {
            text1Animation: () => {
                const chars = texts[0].querySelectorAll('.char');
                gsap.fromTo(
                    chars,
                    { opacity: 0, y: 100, rotate: 360 },
                    {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        stagger: 0.05,
                        duration: 0.2,
                        ease: 'back.out(1.7)',
                    }
                );
            },
            text2Animation: () => {
                const chars = texts[1].querySelectorAll('.char');
                gsap.fromTo(
                    chars,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: 'power1.out',
                    }
                );
            },
            text3Animation: () => {
                const chars = texts[2].querySelectorAll('.char');
                gsap.fromTo(
                    chars,
                    { opacity: 0, y: -100, scale: 0.5 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
            },
            text4Animation: () => {
                const chars = texts[3].querySelectorAll('.char');
                gsap.fromTo(
                    chars,
                    { opacity: 0, x: -100, rotate: -45 },
                    {
                        opacity: 1,
                        x: 0,
                        rotate: 0,
                        stagger: 0.1,
                        duration: 0.1,
                        ease: 'power2.out',
                    }
                );
            },
        };

        // Apply animations based on the presence of texts
        if (text1) {
            animations.text1Animation();
        }
        if (text2) {
            animations.text2Animation();
        }
        if (text3) {
            animations.text3Animation();
        }
        if (text4) {
            animations.text4Animation();
        }

    }, [text1, text2, text3, text4]);

    const textStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px',
        textAlign: 'center',
    };

    return (
        <div>
            {text1 && (
                <h1
                    ref={(el) => (textRefs.current[0] = el)}
                    style={textStyle}
                >
                    {text1.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-flex', marginRight: '8px' }}>
                            {word.split('').map((char, j) => (
                                <span key={j} className="char" style={{ display: 'inline-block' }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            )}
            {text2 && (
                <h1
                    ref={(el) => (textRefs.current[1] = el)}
                    style={textStyle}
                >
                    {text2.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-flex', marginRight: '8px' }}>
                            {word.split('').map((char, j) => (
                                <span key={j} className="char" style={{ display: 'inline-block' }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            )}
            {text3 && (
                <h1
                    ref={(el) => (textRefs.current[2] = el)}
                    style={textStyle}
                >
                    {text3.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-flex', marginRight: '8px' }}>
                            {word.split('').map((char, j) => (
                                <span key={j} className="char" style={{ display: 'inline-block' }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            )}
            {text4 && (
                <h1
                    ref={(el) => (textRefs.current[3] = el)}
                    style={textStyle}
                >
                    {text4.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-flex', marginRight: '8px' }}>
                            {word.split('').map((char, j) => (
                                <span key={j} className="char" style={{ display: 'inline-block' }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            )}
        </div>
    );
};

export default AnimatedText;
