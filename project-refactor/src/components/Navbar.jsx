function Navbar() {

    return(
        <>
        <div id="navbar">
            <img src="project-refactor\src\assets\logo.svg" alt="site logo" />
            <div id="links">
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Resources</a>
            </div>
            <a href="javascript:void(0);" class="icon" onclick="toggleNav()">
                 <i class="fa fa-bars"></i>
            </a>
        </div>
        </>
    )
}

export default Navbar;