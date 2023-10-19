"use client"
import { Container } from "semantic-ui-react"
import styles from "./BasicLayout.module.scss"
import classNames from "classnames"
import TopBar from "@/components/Layout/TopBar/TopBar"
import { Footer } from "@/components/Layout"

export default function BasicLayout({ children, isOpenSearch = false, isContainer = false, relative = false }) {
    const error = console.error;
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };
    return (
        <>
            {/* TODO: TopBar */}
            <TopBar isOpenSearch={isOpenSearch} />
            <Container fluid>
                <div className={classNames({ [styles.relative]: relative })} >
                    {isContainer ? <Container> {children} </Container> : children}
                </div>
            </Container>

            {/* TODO: FOOTER */}
            <Footer/>
        </>
    )
}
