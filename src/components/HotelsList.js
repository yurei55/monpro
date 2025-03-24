import React from 'react';
import styled from 'styled-components';
import HotelsItem from './HotelsItem';

const HotelsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title: '제목',
    description: '내용',
    url: 'https://google.com/',
    urlToImage: 'https://via.placeholder.com/160',
};

const HotelsList = () => {
    return (
        <HotelsListBlock>
            <HotelsItem article={sampleArticle} />
            <HotelsItem article={sampleArticle} />
            <HotelsItem article={sampleArticle} />
            <HotelsItem article={sampleArticle} />
            <HotelsItem article={sampleArticle} />
            <HotelsItem article={sampleArticle} />
        </HotelsListBlock>
    );
};

export default HotelsList;