import { ENV } from '@/utils'
import { Image } from 'semantic-ui-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export function SearchComp({ games, textSearch, setTextSearch }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = searchParams.get("s")
        setTextSearch(url || '')
    }, [])


    const handleOnSelect = (item) => {
        setTextSearch(item.attributes.title)
        router.push(`/${item.attributes.slug}`)
    }
    const handleSearch = async (e) => {
        if (e.key === "Enter") {
          try {
            await setTextSearch(e.target.value);
            router.push(`/search?s=${e.target.value}`);
          } catch (error) {
            // Manejar errores si es necesario
            console.error("Error al establecer el texto de búsqueda:", error);
          }
        }
      }
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setTextSearch(string)
    }
    const renderItem = (item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src={`${ENV.IMG}${item.attributes.cover.data.attributes.url}`}
                style={{ with: 40, height: 40 }}
            />
            <span>{item.attributes.title}</span>
        </div>
    );
    return (
        <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '100px',
            fontSize: '16px',
        }}
            onKeyDown={handleSearch}
        >
            <ReactSearchAutocomplete
                items={games}
                placeholder='Busca juegos'
                inputSearchString={textSearch}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={renderItem}
                showNoResults={false}
                autoFocus
                fuseOptions={{ keys: ["attributes.title"] }}
                resultStringKeyName="attributes"
                styling={
                    {
                        backgroundColor: "#7f5af0",
                        color: "#fffffe",
                        iconColor: "#fffffe",
                        height: "60px",
                        hoverBackgroundColor: "#BDACFD",
                        placeholderColor: "#fffffe"
                    }
                }
            />
        </div>)
}