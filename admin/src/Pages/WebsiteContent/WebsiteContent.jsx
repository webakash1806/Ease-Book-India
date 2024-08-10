import React from 'react'
import HomeLayout from '../../Layouts/HomeLayouts'
import { FaHome } from 'react-icons/fa'
import { MdContactPhone, MdOutlineRoundaboutRight, MdReviews } from 'react-icons/md'
import WebsiteContentCard from '../../Components/Cards/WebsiteContentCard'

const WebsiteContent = () => {
    const list = [
        {
            name: "Home",
            link: "/website-content/home",
            icon: <FaHome />,
            color: 'bg-[#655CCE]',
            list: 'Hero section || History || Our team'

        },
        {
            name: "About",
            link: "/website-content/about",
            icon: <MdOutlineRoundaboutRight />,
            color: 'bg-[#EA5455]',
            list: 'Our mission || History || Our team'
        },
        {
            name: "Contact",
            link: "/website-content/contact",
            icon: <MdContactPhone />,
            color: 'bg-[#FF9F43]',
            list: 'Social links || Contact List || Map'

        },
        {
            name: "Testimonial",
            link: "/website-content/testimonial",
            icon: <MdReviews />,
            color: 'bg-[#28C76F]',
            list: 'Reviews'

        }
    ]

    return (
        <HomeLayout>
            <div className='grid items-center justify-center grid-cols-1 gap-6 p-6 sm:grid-cols-2'>

                {list.map((data, index) => <WebsiteContentCard data={data} key={index + 1} />)}
            </div>
        </HomeLayout>
    )
}

export default WebsiteContent
