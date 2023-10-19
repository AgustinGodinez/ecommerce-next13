'use client'
import { Footer, HeaderCart } from "@/components/Layout";
import { Separator } from "@/components/Shared";
import { Container } from "semantic-ui-react";

export default function CartLayout({ children }) {
    const error = console.error;
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <>
            <HeaderCart />
            <Separator height={150} />

            <Container>{children}</Container>

            <Separator height={70} />

            <Footer />
        </>
    )
}
