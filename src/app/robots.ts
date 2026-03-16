// ** Next
import { MetadataRoute } from "next"

// ** Config
import { BASE_URL } from "@/configs/api"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",

                disallow: [
                    "/top/",

                    // search spam
                    "/tim-kiem?tu-khoa=*.com",
                    "/tim-kiem?tu-khoa=*.cc",
                    "/tim-kiem?tu-khoa=*.vip",
                    "/tim-kiem?tu-khoa=*.net",

                    // casino / spam keywords
                    "/*casino*",
                    "/*slot*",
                    "/*bet*",
                    "/*win77*",
                    "/*win777*",
                    "/*king88bet*",
                    "/*kingbet88*",

                    // crypto spam
                    "/*binance*",
                    "/*telegram*",
                    "/*wechat*",

                    // adult spam
                    "/*sex*",
                    "/*javhd*",
                    "/*xxxx*",

                    // weird characters spam
                    "/*[*",
                    "/*《*",
                    "/*】*",
                    "/*【*",
                    "/*⭐*",
                    "/*⭕*",

                    // domains
                    "/*.live*",
                ],
            },
        ],

        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}