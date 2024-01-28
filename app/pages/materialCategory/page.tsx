'use client'
import Image from "next/image";
import Link from "next/link";
import {routes} from "@/recources";
import {useEffect, useState} from "react";
import {Api} from "@/api/Api";

type model = {
    id: number,
    image: string,
    name: string,
}
export default function Category() {
    const [categories, setCategories] = useState<model[]>([]);

    useEffect(() => {
        Api.all('category/getCategoryMaterials').then((cat) => {
            setCategories(cat);
        })
    }, []);

    return (
        <main className="py-5 md:p-20 flex flex-col space-y-10">
            <h1 className={"md:text-[45px] ml-2 font-bold"}>NOS MATÉRIAUX DE CONSTRUCTION.</h1>

            <div className={"md:w-[700px] px-2 w-auto"}>
                <p className={"md:text-[25px]  font-thin"}>
                    Votre destination en ligne pour des matériaux de
                    construction de qualité. Explorez notre gamme variée,
                    du béton aux revêtements, avec des conseils d'experts à
                    portée de clic.<span className={"text-violet"}> Nous garantissons qualité et satisfaction pour vos projets.
                </span>
                </p>
            </div>


            {/*card of categories*/}

            <div className={"w-full flex flex-col space-y-5 md:space-x-5 md:space-y-0 md:flex-row"}>
                {/*cards*/}

                    {
                        categories.length == 0 ? <div className={"self-center "}> Les Matériaux ne sont pas disponibles!!! </div> :
                        categories.map((cat, index) => {
                            return <Link key={index}
                                         href={`${routes.products}/${cat.id}`}
                                         className={" w-auto md:w-[400px] md:ml-5 flex flex-col space-y-9"}
                            >
                                {/*image*/}
                                <div className={" self-center md:self-start w-auto"}>
                                    <Image src={cat.image}
                                           alt={"categorieImage"}
                                           width={400}
                                           height={400}
                                           className={"bg-cover bg-contain"}
                                           priority={true}
                                    />
                                </div>

                                <div className={"text-center text-[20px]"}>
                                    {cat.name}
                                </div>

                            </Link>
                        })
                    }
            </div>
        </main>
    )
}