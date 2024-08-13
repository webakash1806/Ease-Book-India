import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedText = ({ text1, text2, text3, text4 }) => {
    const textRefs = useRef([]);

    useEffect(() => {
        const texts = textRefs.current;

        // Clear previous animations
        gsap.killTweensOf(texts);

        // Define different animations for various cases
        const animations = {
            singleText: () => {
                const chars = texts[0].querySelectorAll('.char');
                gsap.fromTo(
                    chars,
                    { opacity: 0, y: 100, rotate: 360 },
                    {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        stagger: 0.05,
                        duration: 1.5,
                        ease: 'back.out(1.7)',
                    }
                );
            },
            twoTexts: () => {
                const chars1 = texts[0].querySelectorAll('.char');
                const chars2 = texts[1].querySelectorAll('.char');
                gsap.fromTo(
                    chars1,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars2,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
            },
            threeTexts: () => {
                const chars1 = texts[0].querySelectorAll('.char');
                const chars2 = texts[1].querySelectorAll('.char');
                const chars3 = texts[2].querySelectorAll('.char');

                gsap.fromTo(
                    chars1,
                    { opacity: 0, y: -50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars2,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars3,
                    { opacity: 0, scale: 0.5 },
                    {
                        opacity: 1,
                        scale: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
            },
            fourTexts: () => {
                const chars1 = texts[0].querySelectorAll('.char');
                const chars2 = texts[1].querySelectorAll('.char');
                const chars3 = texts[2].querySelectorAll('.char');
                const chars4 = texts[3].querySelectorAll('.char');

                gsap.fromTo(
                    chars1,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars2,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars3,
                    { opacity: 0, y: -100 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
                gsap.fromTo(
                    chars4,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                    }
                );
            },
        };

        // Determine which animation to apply based on the number of texts
        if (text1 && !text2 && !text3 && !text4) {
            animations.singleText();
        } else if (text1 && text2 && !text3 && !text4) {
            animations.twoTexts();
        } else if (text1 && text2 && text3 && !text4) {
            animations.threeTexts();
        } else if (text1 && text2 && text3 && text4) {
            animations.fourTexts();
        }

    }, [text1, text2, text3, text4]);

    return (
        <div>
            {text1 && (
                <h1 ref={(el) => (textRefs.current[0] = el)} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {text1.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'flex', marginRight: '8px' }}>
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
                <h1 ref={(el) => (textRefs.current[1] = el)} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {text2.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'flex', marginRight: '8px' }}>
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
                <h1 ref={(el) => (textRefs.current[2] = el)} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {text3.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'flex', marginRight: '8px' }}>
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
                <h1 ref={(el) => (textRefs.current[3] = el)} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {text4.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'flex', marginRight: '8px' }}>
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
