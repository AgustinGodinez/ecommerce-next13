import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import styles from './Paginations.module.scss'
import { Pagination as PaginatiionSU } from 'semantic-ui-react'

export function Paginations({ currentPage, slug, totalPages }) {
console.log(slug);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const onPageChange = (_, data) => {
    const { activePage } = data
    if (slug){
      const url = `${pathname}?s=${slug}&page=${activePage}`
      router.push(url)
    }else{
      const url = `${pathname}?page=${activePage}`
    console.log(url);

    router.push(url)
    }


/*     console.log(`${pathname}, ${searchParams} ${slug}`);
 */
/*     router.push(`/games/${slug}?page=${activePage}`)
 */
    /* router.replace({ query: { ...router.query, page: activePage } }) */

    /* const newQuery = { ...router.query, page: activePage };
    const anadido = new URLSearchParams(newQuery).toString();
    const newUrl = `/games/${slug}?${anadido}`
    router.replace(newUrl)
    onReload() */
  }
  return (
    <div className={styles.container}>
      <PaginatiionSU
        defaultActivePage={currentPage}
        totalPages={totalPages}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={onPageChange}
      />
    </div>
  )
}
