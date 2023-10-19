'use client'
import { Game, Platform } from '@/api'
import { GridGames, NoResult, Paginations, Separator } from '@/components/Shared'
import BasicLayout from '@/layouts'
import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'

const platformCtrl = new Platform()
const gameCtrl = new Game()

export default function page({ params, searchParams }) {
  const [games, setGames] = useState('')
  const [platform, setPlatform] = useState()
  const [pagination, setPagination] = useState('')

  const { page = 1 } = searchParams
  const hasProducts = games.length > 0

  useEffect(() => {
    (async () => {
      const responsePlatform = await platformCtrl.getBySlug(params.platform)
      const responseGame = await gameCtrl.getGamesByPlatformSlug(params.platform, page)
      setPlatform(responsePlatform);
      setGames(responseGame.data);
      setPagination(responseGame.meta.pagination);
    })()
  }, [searchParams])

  if (!platform) return null
  if (!games) return null
  if (!pagination) return null


  return (
    <>
      <BasicLayout>
        <Container>
          <Separator height={100} />
          {platform.attributes.title}
          {hasProducts ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Paginations
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : <NoResult text={`La categoria ${platform.attributes.title} aun no tiene productos`} />}
          <Separator height={50} />
        </Container>
      </BasicLayout>
    </>
  )
}
