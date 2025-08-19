import React, { useRef, useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      document.body.style.userSelect = 'none'; // prevent selection 
    };

    const stopDragging = () => {
      isDown = false;
      el.classList.remove("dragging");
      document.body.style.userSelect = ''; // restore selection
    };

    const onDrag = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // adjust multiplier for scroll speed
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', startDragging);
    el.addEventListener('mouseleave', stopDragging);
    el.addEventListener('mouseup', stopDragging);
    el.addEventListener('mousemove', onDrag);

    return () => {
      el.removeEventListener('mousedown', startDragging);
      el.removeEventListener('mouseleave', stopDragging);
      el.removeEventListener('mouseup', stopDragging);
      el.removeEventListener('mousemove', onDrag);
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Variety of Menus</h1>
      <p className='explore-menu-text'>
        From sizzling appetizers to delightful desserts, our menu is crafted to satisfy every craving.
        Whether you're in the mood for something spicy, sweet, or savory, we have something for everyone!
      </p>

      <div className="explore-menu-list" ref={scrollRef}>
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
            }
            key={index}
            className='explore-menu-list-item'
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
