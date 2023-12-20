'use client';
import DetailledArt from '@/components/DetailledArt';
// import { useRouter } from 'next/router';

import DetailledArtist from '@/components/DetailledArtist';
import React, { useEffect, useState } from 'react';

type ArtDetailsProps = {
    labelArt: any;
    labelArtist: string;
    abstract: string;
    labelMovement: string;
    thumbnail_url: string;
    completionDate: string;
    locationLabel: string;
    price: string;
};

export default function ArtDetails({ params }) {
    console.log(params);

    const [artDetails, setArtDetails] =
        useState<ArtDetailsProps | null>(null);
    const getArtDetails = async (artId: string) => {
        const res = await fetch(
            `http://localhost:3000/api/search?query=${encodeURIComponent(
                artId,
            )}&type=getInfosOeuvre`,
        );
        console.log(res);
        const artDetails = await res.json();
        console.log(artDetails);
        setArtDetails(artDetails);
    };

    useEffect(() => {
        getArtDetails(params.oeuvreId);
    }, []);

    return (
        <>
            {artDetails && (
                <DetailledArt 
                    name={artDetails.labelArt} 
                    author={artDetails.labelArtist} 
                    description={artDetails.abstract}
                    movement={artDetails.labelMovement} 
                    imgSrc={artDetails.thumbnail_url} 
                    date={artDetails.completionDate} 
                    location={artDetails.locationLabel.value} 
                    price={artDetails.price}
                />
            )}
        </>
    );
}
