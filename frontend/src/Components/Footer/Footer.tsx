import { Button, Flex, Grid, Text, TextInput } from "@mantine/core";
import styles from "./Footer.module.scss";
import { useForm } from "@mantine/form";
import SliderFooter from "./SliderFooter/SliderFooter";
import { Link } from "react-router-dom";
const Footer = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            termsOfService: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Không đúng định dạng email",
        },
    });
    return (
        <footer>
            <div className="mt-[20px]">
                <div className="container">
                    <div className={`${styles.footer__top}`}>
                        <Grid>
                            <Grid.Col
                                span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 3 }}
                            >
                                <ul>
                                    <li className={styles.footer__title}>
                                        KẾT NỐI VỚI NHÀ XINH
                                    </li>
                                    <li>
                                        <div className="bg-slate-400 w-10 h-[3px] mt-2 mb-2 rounded-sm hover:bg-white "></div>
                                    </li>
                                    <li>
                                        <div
                                            className={`w-[142px] ${styles.logoFooter}`}
                                        >
                                            <Link to="/">
                                                <Text
                                                    size="lg"
                                                    fw={900}
                                                    variant="gradient"
                                                    gradient={{
                                                        from: "rgb(43 ,29 ,82,0.94)",
                                                        to: "rgb(98 ,0 ,255,0.95)",
                                                        deg: 0,
                                                    }}
                                                    style={{ padding: "5px" }}
                                                >
                                                    Morden Home
                                                </Text>
                                            </Link>
                                        </div>
                                    </li>
                                    <li
                                        className={`${styles.footer__followUs} `}
                                    >
                                        <p className="text-[16px] mt-[30px]">
                                            Theo dõi chúng tôi
                                        </p>
                                        <p>Instagram - Youtube - Facebook</p>
                                    </li>
                                    {/* <li>
                                        <Button
                                            variant="default"
                                            className={styles.footer__storeBtn}
                                        >
                                            Hệ thống cửa hàng
                                        </Button>
                                    </li> */}
                                </ul>
                            </Grid.Col>
                            <Grid.Col
                                span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 3 }}
                            >
                                <ul>
                                    <li className={styles.footer__title}>
                                        NHÀ XINH
                                    </li>
                                    <li>
                                        <div className="bg-slate-400 w-10 h-[3px] mt-2 mb-2 rounded-sm hover:bg-white "></div>
                                    </li>
                                    <li>
                                        <ul className={styles.footer__links}>
                                            <li>Giới thiệu</li>
                                            <li>Chuyện Nhà Xinh</li>
                                            <li>Tổng công ty</li>
                                            <li>Tuyển dụng</li>
                                            <li>Thẻ hội viên</li>
                                            <li>Đổi trả hàng</li>
                                        </ul>
                                    </li>
                                </ul>
                            </Grid.Col>
                            <Grid.Col
                                span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 3 }}
                            >
                                <ul>
                                    <li className={styles.footer__title}>
                                        CẢM HỨNG
                                    </li>
                                    <li>
                                        <div className="bg-slate-400 w-10 h-[3px] mt-2 mb-2 rounded-sm hover:bg-white "></div>
                                    </li>
                                    <li>
                                        <ul className={styles.footer__links}>
                                            <li>Sản phẩm</li>
                                            <li>Ý tưởng</li>
                                        </ul>
                                    </li>
                                </ul>
                            </Grid.Col>
                            <Grid.Col
                                span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 3 }}
                            >
                                <ul>
                                    <li className={styles.footer__title}>
                                        LỜI NHẮN
                                    </li>
                                    <li>
                                        <div className="bg-slate-400 w-10 h-[3px] mt-2 mb-2 rounded-sm hover:bg-white "></div>
                                    </li>
                                    <li>
                                        <p className={styles.footer__message}>
                                            Hãy để lại email của bạn để nhận
                                            được những ý tưởng trang trí mới và
                                            những thông tin, ưu đãi từ MORDEN
                                            HOME
                                        </p>
                                    </li>
                                    <li>Email: support@mordenhome.com</li>
                                    <li>
                                        <form
                                            onSubmit={form.onSubmit((values) =>
                                                console.log(values),
                                            )}
                                        >
                                            <Flex direction="row" gap="lg">
                                                <TextInput
                                                    withAsterisk
                                                    placeholder="Email của bạn"
                                                    key={form.key("email")}
                                                    {...form.getInputProps(
                                                        "email",
                                                    )}
                                                />
                                                <Button
                                                    variant="default"
                                                    type="submit"
                                                    className={
                                                        styles.footer__submitBtn
                                                    }
                                                >
                                                    Submit
                                                </Button>
                                            </Flex>
                                        </form>
                                    </li>
                                </ul>
                            </Grid.Col>
                        </Grid>
                    </div>
                    <div className={`${styles.footer__middle} padding`}>
                        <SliderFooter />
                    </div>
                    <div className={styles.footer__bottom}>
                        <div>
                            <Text size="xs">
                                © 2024 Morden Home. All Rights Reserved
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
