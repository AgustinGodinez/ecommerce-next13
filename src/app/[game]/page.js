'use client'
import { Game } from '@/api';
import BasicLayout from '@/layouts';
import { Game as PageGame } from '@/components/Game';
import React, { useEffect, useState } from 'react'
import { ENV } from '@/utils';
import { Separator } from '@/components/Shared';

const gameCtrl = new Game()

export default function page({ params }) {
    const {game} = params
    const [infoGame, setInfoGame] = useState(null)
    
    useEffect(() => {
        (async () => {
            const response = await gameCtrl.getBySlug(game)
            setInfoGame(response)
        })()
    }, [params])
    if (!infoGame) return null

    const wallpaper = infoGame.attributes.wallpaper

    return (
        <BasicLayout>
            <PageGame.HeaderWallpaper image={`${ENV.IMG}${wallpaper.data.attributes.url}`} />

            <PageGame.Panel gameId={infoGame.id} game={infoGame.attributes} />

            <Separator height={50} />

            <PageGame.Info game={infoGame.attributes}/>

            <Separator height={30} />

            <PageGame.Media video={infoGame.attributes.video} screenshots={infoGame.attributes.screenshots.data} />

            <Separator height={50} />

        </BasicLayout>
    )
}
