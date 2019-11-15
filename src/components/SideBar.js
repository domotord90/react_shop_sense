import React from "react";
import { Transition } from "react-transition-group";

import "../styles/SideBar.css";

const DURATION = 300;

const SideBar = ({
  isMenuClicked,
  setIsMenuClicked,
  FontAwesome,
  closeMenu,
  Link
}) => {
  const menuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const sidebarStyle = {
    transition: `width ${DURATION}ms`
  };

  const sidebarTransitionStyles = {
    entering: { width: 0 },
    entered: { width: "200px" },
    exiting: { width: "200px" },
    exited: { width: 0 }
  };

  const linkStyle = {
    transition: `opacity ${DURATION}ms`
  };

  const linkTransitionStyles = {
    entering: { pointerEvents: "none", opacity: 0 },
    entered: { pointerEvents: "auto", opacity: 1 },
    exiting: { pointerEvents: "auto", opacity: 1 },
    exited: { pointerEvents: "none", opacity: 0 }
  };

  return (
    <div className="side-bar-container">
      <div className="menu-bar-container">
        <Transition in={isMenuClicked} timeout={DURATION}>
          {state => (
            <div
              className={`menu-bar`}
              style={{ ...sidebarStyle, ...sidebarTransitionStyles[state] }}
            >
              <Transition in={isMenuClicked} timeout={DURATION}>
                {state => (
                  <div
                    style={{
                      ...linkStyle,
                      ...linkTransitionStyles[state]
                    }}
                    className="menu-bar-transition"
                  >
                    <nav>
                      <ul>
                        <li>
                          <Link className="links" to="/">
                            Home
                          </Link>
                        </li>

                        <li>
                          <Link className="links" to="categories">
                            Shop
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    <FontAwesome onClick={menuClick} icon={closeMenu} />
                  </div>
                )}
              </Transition>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default SideBar;
