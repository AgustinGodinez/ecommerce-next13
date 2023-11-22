'use client'
import { Game } from '@/api'
import { GridGames, NoResult, Paginations, Separator } from '@/components/Shared'
import BasicLayout from '@/layouts'
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { useSearchParams } from 'next/navigation'

const gameCtrl = new Game();

export default function page() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('s'))
  const [page, setpage] = useState(searchParams.get('page') || 1)
  const [games, setGames] = useState('')
  const [pagination, setPagination] = useState(1)

  useEffect(() => {
    (async () => {
      const response = await gameCtrl.searchGame(search, page)
      setSearch(searchParams.get('s'))
      setpage(searchParams.get('page') || 1)
      setGames(response.data)
      setPagination(response.meta.pagination)
    })()
  }, [searchParams])

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />
          <h2>Buscando: {search}</h2>
          {

            games.length > 0 ?
              (
                <>
                  <GridGames games={games} />
                  <Paginations currentPage={pagination.page} slug={search} totalPages={pagination.pageCount} />
                </>

              )
              :
              (
                <NoResult text={`El juego ${search} aun no esta disponible`} />
              )
          }

          <Separator height={50} />

        </Container>
      </BasicLayout>
    </>
  )
}
