import { Image } from 'semantic-ui-react'
import styles from './Gallery.module.scss'
import { ENV } from '@/utils'
import { FullModal } from '@/components/Shared'
import { useState } from 'react'
import Slider from 'react-slick'

export function Gallery({ screenshots }) {

    const [show, setShow] = useState(false)
    const onOpenClose = () => setShow((prevState) => !prevState)

    const screenshotsClone = [...screenshots]
    const principalImage = screenshotsClone.shift()

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        customPaging: function (index){
            return <Image src={`${ENV.IMG}${screenshots[index].attributes.url}`}/>
        }
    }


    return (
        <>
            <div className={styles.gallery}>
                <div className={styles.principal}>
                    <Image src={`${ENV.IMG}${principalImage.attributes.url}`} onClick={onOpenClose} />
                </div>
                <div className={styles.grid}>
                    {screenshotsClone.map((screenshot) => (
                        <div key={screenshot.id}>
                            <Image src={`${ENV.IMG}${screenshot.attributes.url}`} onClick={onOpenClose} />
                        </div>
                    ))}
                </div>
            </div>
            <FullModal show={show} onClose={onOpenClose}>
                <div className={styles.carouselContainer}>
                    <Slider {...settings}>
                        {screenshots.map((screenshot) => (
                            <div key={screenshot.id}>
                                <Image src={`${ENV.IMG}${screenshot.attributes.url}`}  />
                            </div>
                        ))}
                    </Slider>
                </div>
            </FullModal>
        </>
    )
}
