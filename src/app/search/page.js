'use client'
import { Game } from '@/api'
import { GridGames, NoResult, Paginations, Separator } from '@/components/Shared'
import BasicLayout from '@/layouts'
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'



export default function page({ params, searchParams }) {
  const [games, setGames] = useState('')
  const [pagination, setPagination] = useState('')
  const [searchText, setSearchText] = useState('')
  const hasResult = games.length > 0
  const {s='', page=1} = searchParams
  useEffect(() => {
    (async () => {
      document.getElementById('search-games').focus()
      const gameCtrl = new Game();
      const response = await gameCtrl.searchGame(s, page);
      setGames(response.data)
      setPagination(response.meta.pagination)
      setSearchText(s)
    })()
  }, [searchParams])

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />
          <h2>Buscando: {searchText}</h2>

          {
            hasResult ?
            (
              <> 
              <GridGames games={games} /> 
              <Paginations  currentPage ={pagination.page} slug={s} totalPages={pagination.pageCount}/>
              </>
              ):(
                <NoResult text={`El juego ${s} aun no esta disponible`}/>
            )
          }
          <Separator height={50} />

        </Container>
      </BasicLayout>
    </>
  )
}
