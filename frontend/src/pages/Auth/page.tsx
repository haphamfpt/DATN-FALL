import { imageLogin } from "@/assets/img";
import Logo from "@/Components/logo/logo";
import { Box, Image } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import style from "./Auth.module.scss";
const Auth = () => {
    return (
        <>
            <Box className={style.container}>
                <Box className={style.logo}>
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </Box>
                <Box className={style.imageUser}>
                    <Image src={imageLogin} />
                </Box>
                <Box className={style.images}>
                    <svg
                        width="100%"
                        height="100vh"
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="10 10 80 80"
                    >
                        <path
                            fill="#bca3d9"
                            className={style.outTop}
                            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
                        />
                    </svg>
                </Box>
                <Box className={style.content_login}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Auth;
