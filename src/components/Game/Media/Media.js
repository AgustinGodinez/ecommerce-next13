import { Separator } from '@/components/Shared';
import React from 'react'
import { Container } from 'semantic-ui-react';
import { Video } from './video/Video';
import { Gallery } from './Gallery/Gallery';

export function Media({ video, screenshots }) {
    return (
        <Container>
            <h2>Visuales</h2>
            <Separator height={30} />

            <Video video={video} />

            <Separator height={30} />

            <Gallery screenshots={screenshots} />
            
        </Container>
    )
}
