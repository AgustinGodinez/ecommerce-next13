'use client'
import { Game } from '@/api';
import { ENV, fn, } from '@/utils';
import React, { useEffect, useState } from 'react'
import { Container, Image } from 'semantic-ui-react';
import styles from './BannerLastGamePublished.module.scss';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { Label } from '@/components/Shared';

const gameCtrl = new Game()

export function BannerLastGamePublished() {
    const [game, setGame] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const response = await gameCtrl.getLastPublished()
                setGame(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    if (!game) return null;

    const wallpaper = game.attributes.wallpaper;
    const releaseDate = new Date(game.attributes.releaseData).toISOString()
    const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)

    return (
        <div className={styles.container}>
            <Image src={`${ENV.IMG}${wallpaper.data.attributes.url}`} className={styles.wallpaper} />

            <Link className={styles.infoContainer} href={game.attributes.slug}>
                <Container>
                    <span className={styles.date}>
                        {DateTime.fromISO(releaseDate).minus({ day: 1 }).toRelative()}
                    </span>
                    <h2>{game.attributes.title}</h2>
                    <p className={styles.price}>
                        {game.attributes.discount > 0 && (
                            <Label.Discount className={styles.discount}>
                                {`-${game.attributes.discount}`}
                            </Label.Discount>
                        )}                       
                         {game.attributes.discount > 0 ? (
                            <span className={styles.finalPrice}><span style={{ fontSize: '20px' }}>De: ${game.attributes.price} a</span> ${price}</span>
                        ) : (
                            <span className={styles.finalPrice}><span style={{ fontSize: '20px' }}>A: ${game.attributes.price}</span></span>

                        )}
                    </p>
                </Container>
            </Link>
        </div>
    )
}
