import Image from "next/image";
import Link from "next/link";
import {routes} from "@/recources";

const category = [
    {
        name: "Sable",
        image: "Sable-a-filtre-0-8805.jpg",
        link: `${routes.product}#sand`
    },
    {
        name: "Remblai",
        image: "Sable-0-4-orange803.jpg",
        link: `${routes.product}#blank`
    },
    {
        name: "Gravier",
        image: "Quartz-Super-Blanc-5-11800.jpg",
        link: `${routes.product}#gravel`
    },
    {
        name: "Matériaux de construction",
        image: "materiaux-mysweetimmo.jpg",
        link: `${routes.materialCat}`
    },
];
export default function Category() {
    return (
        <main className="py-5 md:p-20 flex flex-col space-y-10">
            <h1 className={"md:text-[50px] ml-2 font-bold"}>Nos catégories de produit.</h1>

            <div className={"md:w-[700px] px-2 w-auto"}>
                <p className={"md:text-[35px]  font-thin"}>
                    Nous disposons
                    d’une large gamme de matériaux pour la construction,
                    la filtration et la décoration : <span className={"text-violet"}>
                    sables,
                    graviers et des matériaux de constructions.
                </span>
                </p>
            </div>


            {/*card of categories*/}

            <div className={"w-full flex flex-col space-y-5 md:content-between md:justify-between md:space-y-0 md:flex-row"}>
                {/*cards*/}

                    {
                        category.map((cat, index) => {
                            return <Link key={index}
                                         href={cat.link}
                                         className={" w-auto md:w-[400px] md:ml-5 flex flex-col space-y-9"}
                            >
                                {/*image*/}
                                <div className={" self-center md:self-start w-auto"}>
                                    <Image src={`/images/categoris/${cat.image}`}
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