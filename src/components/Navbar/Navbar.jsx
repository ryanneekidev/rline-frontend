import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock-upgrade';

function Navbar() {
    const auth = useAuth();

    const openNavMenu = () => {
        document.querySelector("#navbar-menu-open").setAttribute("aria-expanded", "true")
        document.querySelector("#navbar-menu").removeAttribute("inert")
        document.querySelector("#navbar-menu").removeAttribute("style")
        disableBodyScroll(document.querySelector("body"))
    }

    const closeNavMenu = () => {
        document.querySelector("#navbar-menu-open").setAttribute("aria-expanded", "false")
        document.querySelector("#navbar-menu").setAttribute("inert", "")

        setTimeout(() => {
            document.querySelector("#navbar-menu").style.transition = "none"
        }, 500)

        enableBodyScroll(document.querySelector("body"))
    }

    const media = window.matchMedia('(width < 600px)')

    let navmenu = document.querySelector('#navbar-menu')

    function waitForElement(selector, callback) {
        const observer = new MutationObserver((mutations, observer) => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                callback(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    const setupTopNav = (e) => {
        if (e.matches) {
            navmenu.setAttribute("inert", "")
            navmenu.style.transition = "none"
        } else {
            navmenu.removeAttribute("inert")
            closeNavMenu();
        }
    }

    waitForElement('#navbar-menu', (element) => {
        setupTopNav(element);
    });

    media.addEventListener("change", function (e) {
        setupTopNav(e)
    })

    return (
        <>
            <div className="navbar">
                <div className="navbar-left-section">
                    <Link to="/" className="rline-logo-link">RLine</Link>
                </div>

                <span id="nav-label" hidden>Navigation</span>
                <button onClick={openNavMenu} id="navbar-menu-open" className="navbar-menu-open" aria-expanded="false" aria-labelledby="nav-label"><img src="menu.svg" width={28} height={28}></img></button>

                <div id="navbar-menu" className="navbar-menu" role="dialog" aria-labelledby="nav-label">
                    <button onClick={closeNavMenu} id="navbar-menu-close" className="navbar-menu-close"><img src="x.svg" width={28} height={28}></img></button>
                    <div className="navbar-right-section">
                        {
                            auth.token !== "" ? (
                                <>
                                    <Link to="/profile" className="navbar-profile-link navbar-link">{auth.user.username}</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="rline-home-link navbar-link">Home</Link>
                                    <Link to="/create" className="rline-create-link navbar-link">Create</Link>
                                    <Link to="/login" className="navbar-login-link navbar-link">Sign In</Link>
                                    <Link to="/register" className="navbar-register-link navbar-link">Sign Up</Link>
                                </>
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar;