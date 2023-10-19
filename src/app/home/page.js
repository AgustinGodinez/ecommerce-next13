'use client'
import { Home } from "@/components/Home";
import { BannerAd, BarTrust, Separator } from "@/components/Shared";
import BasicLayout from "@/layouts/BasicLayout/BasicLayout";
import { Container } from "semantic-ui-react";

const platformId = {
    playstation: 1,
    xbox: 2,
    nintendo: 3,
    pc: 4
}
export default function page() {
    return (
        <>
            <BasicLayout>
                <Home.BannerLastGamePublished />

                <Separator height={100} />

                <Container>
                    <Home.LatestGame title="Ultimos Lanzamientos" limit={9} />
                </Container>

                <Separator height={100} />
                <BarTrust />
                <Separator height={100} />

                <Container>
                    <Home.LatestGame
                        title="Playstation"
                        limit={3}
                        platformId={platformId.playstation}
                    />
                </Container>

                <Separator height={100} />
                <BannerAd
                    title="Registrate y obten los mejores precios"
                    subtitle="Compara con otros juegos y elige el tuyo"
                    btnTitle="Entrar ahora"
                    btnLink="/account"
                    image="/imagenes/img.jpg"
                />

                <Separator height={50} />
                <Container>
                    <Home.LatestGame
                        title="Xbox"
                        limit={3}
                        platformId={platformId.xbox}
                    />
                </Container>
                <Separator height={100} />

            </BasicLayout>
        </>
    )
}
