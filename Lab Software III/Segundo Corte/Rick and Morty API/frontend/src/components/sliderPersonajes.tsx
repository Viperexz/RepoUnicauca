import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/SliderPersonajes.css';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

const characters: Character[] = [
    {
        id: 361,
        name: "Toxic Rick",
        status: "Dead",
        species: "Humanoid",
        type: "Rick's Toxic Side",
        gender: "Male",
        origin: { name: "Alien Spa", url: "https://rickandmortyapi.com/api/location/64" },
        location: { name: "Earth", url: "https://rickandmortyapi.com/api/location/20" },
        image: "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/27"],
        url: "https://rickandmortyapi.com/api/character/361",
        created: "2018-01-10T18:20:41.703Z"
    },
    {
        id: 362,
        name: "Ants in My Eyes Johnson",
        status: "Unknown",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Unknown", url: "" },
        location: { name: "Interdimensional Cable", url: "https://rickandmortyapi.com/api/location/3" },
        image: "https://rickandmortyapi.com/api/character/avatar/362.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/8"],
        url: "https://rickandmortyapi.com/api/character/362",
        created: "2017-11-04T18:48:46.250Z"
    },
    {
        id: 363,
        name: "Mr. Meeseeks",
        status: "Alive",
        species: "Humanoid",
        type: "Meeseeks",
        gender: "Male",
        origin: { name: "Mr. Meeseeks Box", url: "" },
        location: { name: "Earth", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/242.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/5"],
        url: "https://rickandmortyapi.com/api/character/242",
        created: "2017-11-10T18:48:46.250Z"
    },
    {
        id: 364,
        name: "Birdperson",
        status: "Unknown",
        species: "Alien",
        type: "Bird-Person",
        gender: "Male",
        origin: { name: "Bird World", url: "" },
        location: { name: "Earth", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/399.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/10"],
        url: "https://rickandmortyapi.com/api/character/399",
        created: "2017-11-11T18:48:46.250Z"
    },
];

const settings = {
    dots: true,
    infinite: characters.length > 4,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

const Container = styled.div`
    max-width: 100%;
    overflow: hidden;
    padding: 20px;
`;

const Card = styled.div`
    padding: 10px;
    text-align: center;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SliderPersonajes: React.FC = () => {
    return (
        <Container>
            <Slider {...settings}>
                {characters.map(character => (
                    <Card key={character.id}>
                        <img
                            src={character.image || 'default-image.jpg'}
                            alt={character.name}
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                        <h3>{character.name}</h3>
                        <p>{character.status} - {character.species}</p>
                        <p>{character.gender}</p>
                        <p>Origin: {character.origin.name}</p>
                        <p>Location: {character.location.name}</p>
                    </Card>
                ))}
            </Slider>
        </Container>
    );
};

export default SliderPersonajes;
