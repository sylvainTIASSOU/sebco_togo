export default function TruckInfo() {
    return (
        <main className="p-3">
                <h1 className='text-textbg md:text-[30px] text-[25px]'>RETRAIT ET LIVRAISON</h1>

                <div className='md:px-8'>
                    {/** text1 */}
                    <div>
                        <h1 className='text-textbg md:text-[25px] text-[20px]'>RETRAIT SUR PLACE</h1>
                        <p className='md:text-[15px] '>
                            Notre équipe vous accueille du lundi au vendredi, que vous soyez particulier ou
                            professionnel.
                        </p> <br/>


                        <p className='md:text-[15px] '>
                            Venez découvrir notre gamme de matériaux, les échantillons des produits que nous proposons
                            et profiter de nos conseils personnalisés.
                        </p> <br/>

                        <p className='md:text-[15px] '>
                            Pour l’enlèvement des matériaux, nous disposons d’un espace dédié au chargement de tout type
                            de véhicules pour les particuliers avec une petite remorque, artisans ou entreprises, quai
                            de chargement pour véhicules de grand gabarit.
                        </p>
                    </div>
                    {/** description of truck */}
                    <div className='flex flex-col space-y-10 mt-5'>
                        {/** description 1 */}
                        <div className='flex flex-col space-y-10'>
                            <h1 className='text-textbg md:text-[25px] text-[20px]'>VEHICULES DE LIVRAISONS</h1>

                            {/**truck 1 */}
                            <div className='flex flex-col space-y-5 md:flex-row md:space-x-5'>
                                {/**image */}
                                <div
                                    className='bg-[url("/images/cerealiere.jpg")] w-full h-[250px] md:mt-[2%] bg-cover bg-center md:w-[500px] md:h-[300px] '>

                                </div>
                                {/**text */}
                                <div className='md:w-[500px] '>
                                    <h1 className='text-textbg text-[20px]'> SEMI REMORQUE 44 TONNES </h1>
                                    <p className='md:text-[15px] '>
                                        Ce type d’ensemble routier est adapté aux livraisons jusqu’à 28 tonnes.
                                        Poids total en charge de 44 tonnes.
                                    </p> <br/>

                                    <p className='md:text-[15px] '>
                                        Ce camion permet d’accéder à un chantier via une voirie standard (route
                                        nationale, départementale, …)
                                    </p>
                                    <br/>
                                    <p className='md:text-[15px] '>
                                        Nécessite une route d’accès au chantier
                                        d’une largeur d’au moins 3 mètres, d’une
                                        hauteur minimale de 4,50 m et d’un espace
                                        suffisamment stabilisé et dimensionné pour
                                        permettre une livraison en toute sécurité
                                        (plateforme de stockage, dépôt, …)
                                    </p>
                                </div>
                            </div>

                            {/**truck 2 */}
                            <div className='flex flex-col space-y-5 md:flex-row md:space-x-5'>
                                {/**image */}
                                <div
                                    className='bg-[url("/images/CAMION26.jpg")] w-full h-[250px] md:mt-[2%] bg-cover bg-center md:w-[500px] md:h-[300px] '>

                                </div>
                                {/**text */}
                                <div className='md:w-[500px] '>
                                    <h1 className='text-textbg text-[20px]'>CAMION 26 TONNES</h1>
                                    <p className='md:text-[15px] '>Ce type de camion est adapté aux livraisons de 5 à 14
                                        tonnes.</p> <br/>

                                    <p className='md:text-[15px] '>
                                        Poids total en charge de 26 tonnes.Dimensions Long. : 7,90 m, Larg. : 2,55 m,
                                        Haut. 3,35 mPossibilité de déchargement en bi-benne (latérale).
                                    </p> <br/>

                                    <p className='md:text-[15px] '>
                                        Ce camion permet d’accéder à un chantier via une
                                        voirie standard à étroite (route de campagne,
                                        chemin stabilisé, …) Nécessite un chemin d’accès au
                                        chantier d’une largeur d’au moins 3 mètres, d’une hauteur
                                        minimale de 3,50 m et d’un espace suffisamment
                                        stabilisé et dimensionné pour permettre une livraison en toute sécurité.
                                    </p>
                                </div>
                            </div>

                            {/**truck 3 */}
                            <div className='flex flex-col space-y-5 md:flex-row md:space-x-5'>
                                {/**image */}
                                <div
                                    className='bg-[url("/images/CAMION11.webp")] w-full h-[250px] md:mt-[2%] bg-cover bg-center md:w-[500px] md:h-[300px] '>

                                </div>
                                {/**text */}
                                <div className='md:w-[500px] '>
                                    <h1 className='text-textbg text-[20px]'>CAMION 11 TONNES</h1>
                                    <p className='md:text-[15px] '>Ce type de camion est adapté aux livraisons de 1 à 6
                                        tonnes.</p> <br/>

                                    <p className='md:text-[15px] '>Poids total en charge de 11 tonnes.</p> <br/>

                                    <p className='md:text-[15px] '>
                                        Ce camion est particulièrement adapté pour
                                        les livraisons dans un espace restreint (portail standard, rue…).Nécessite un
                                        chemin d’accès dégagé d’une largeur d’au moins 2,50 m et d’une hauteur de 2,80m.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/**contion de livraison */}
                    <div className='mt-5'>
                        <h1 className='text-textbg md:text-[25px] text-[20px]'>
                            CONDITIONS DE LIVRAISON
                        </h1>

                        <h1 className='md:text-[15px] '>Les livraisons sont effectuées par nos camions qui peuvent
                            contenir de 1 à
                            28 tonnes, au-delà, plusieurs rotations de camions sont à prévoir.</h1> <br/>


                        <h1 className='md:text-[15px] '>
                            Afin d’éviter un désagrément, le livreur vous contactera au moment de partir sur le
                            chantier, vous permettant de bien anticiper. Nous ne pouvons garantir une heure plus
                            précise qu’un créneau de livraison, face aux aléas de la route et des chantiers.
                        </h1> <br/>

                        <h1 className='md:text-[15px] '>
                            Les modalités de déchargement (tas multiples, déchargement en longueur, bi-benne …) seront
                            traitées au cas par cas par nos livreurs.
                        </h1>
                    </div>
                </div>
        </main>
    )
}