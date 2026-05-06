import React, { useCallback, useState, useRef, useEffect } from 'react';
import './MenuSlider.css';
import menuData from './menuData.json';

const MenuSlider = () => {
    const originalLength = menuData.length;
    const initialIndex = 4 + originalLength;
    // Hum index ko middle set ke beech se start karenge (index 4 + originalLength)
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const scrollRef = useRef(null);
    
    // Dragging state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Data ko triple karna taaki loop seamless lage
    const extendedData = [...menuData, ...menuData, ...menuData];

    const scrollToItem = useCallback((index, behavior = 'smooth') => {
        const container = scrollRef.current;
        if (!container) return;
        const slides = container.querySelectorAll('.cfx-slide');
        const targetSlide = slides[index];
        
        if (targetSlide) {
            const offset = targetSlide.offsetLeft - (container.offsetWidth / 2) + (targetSlide.offsetWidth / 2);
            container.scrollTo({
                left: offset,
                behavior: behavior
            });
            setActiveIndex(index);
        }
    }, []);

    // 1. Initial Scroll Position (Start from the middle set)
    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToItem(initialIndex, 'auto'); // 'auto' means no smooth animation on first load
        }, 50); 
        return () => clearTimeout(timer);
    }, [initialIndex, scrollToItem]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        
        const container = scrollRef.current;
        const scrollPos = container.scrollLeft;
        const singleSetWidth = container.scrollWidth / 3;

        // --- INFINITE TELEPORTATION LOGIC ---
        // Agar user pehle set (Left buffer) ke end par pahunche, use middle set par jump karao
        if (scrollPos <= 0) {
            container.scrollLeft = singleSetWidth;
        } 
        // Agar user teesre set (Right buffer) par pahunche, use middle set par wapas lao
        else if (scrollPos >= singleSetWidth * 2) {
            container.scrollLeft = singleSetWidth;
        }

        // Active Index Calculation based on Center
        const center = container.scrollLeft + container.offsetWidth / 2;
        const slides = container.querySelectorAll('.cfx-slide');
        let closestIndex = 0;
        let minDistance = Infinity;

        slides.forEach((slide, index) => {
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            const distance = Math.abs(center - slideCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    // Manual Drag Handlers
    const startDragging = (e) => {
        isDragging.current = true;
        const clientX = e.pageX || e.touches[0].pageX;
        startX.current = clientX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
    };

    const stopDragging = () => {
        isDragging.current = false;
        scrollRef.current.style.cursor = 'grab';
        // Snap to center of active index on release
        scrollToItem(activeIndex);
    };

    const moveEvent = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const clientX = e.pageX || e.touches[0].pageX;
        const x = clientX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; 
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="cfx-menu-section">
            {/* Header / Nav Tabs */}
            <div className="cfx-menu-header">
                {menuData.map((item, index) => (
                    <button
                        key={`nav-${index}`}
                        // Modulo operator ensures the correct tab highlights regardless of which "set" we are in
                        className={`cfx-nav-item ${(activeIndex % originalLength) === index ? 'active' : ''}`}
                        onClick={() => scrollToItem(index + originalLength)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* Slider Container */}
            <div 
                className="cfx-slider-container" 
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={moveEvent}
                onTouchStart={startDragging}
                onTouchEnd={stopDragging}
                onTouchMove={moveEvent}
                style={{ cursor: 'grab', overflowX: 'scroll', scrollbarWidth: 'none' }}
            >
                <div className="cfx-checker-bg"></div>
                <div className="cfx-slider-track" style={{ display: 'flex', width: 'max-content' }}>
                    {extendedData.map((item, index) => (
                        <div 
                            key={`${item.id}-${index}`} 
                            className={`cfx-slide ${activeIndex === index ? 'focused' : ''}`}
                            style={{ flexShrink: 0 }}
                        >
                            <img src={item.image} alt={item.name} draggable="false" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Protein Info Section */}
            {/* <div className="cfx-protein-container">
                <div className="cfx-protein-box classic">
                    <h4 className="cfx-protein-title">Classic Protein</h4>
                    <div className="cfx-protein-list">
                        {activeItem?.classic?.map((p, i) => (
                            <span key={i}>{p} {i !== activeItem.classic.length - 1 && <i className="divider">|</i>}</span>
                        ))}
                    </div>
                </div>

                <div className="cfx-protein-box signature">
                    <h4 className="cfx-protein-title">Signature Protein</h4>
                    <div className="cfx-protein-list">
                        {activeItem?.signature?.map((p, i) => (
                            <span key={i}>{p} {i !== activeItem.signature.length - 1 && <i className="divider">|</i>}</span>
                        ))}
                    </div>
                </div>
            </div> */}

            <button className="cfx-view-menu-btn">View Full Menu</button>
        </div>
    );
};

export default MenuSlider;
