import styled from 'styled-components';

const SkeletonContainer = styled.div`
    width: 150px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 70%;
    background-color: #ccc;
    border-radius: 10px;
`;

const SkeletonText = styled.div`
    width: 80%;
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
    margin-top: 8px;
`;

const SkeletonCard: React.FC = () => {
    return (
        <SkeletonContainer>
            <SkeletonImage />
            <SkeletonText />
            <SkeletonText />
        </SkeletonContainer>
    );
};

export default SkeletonCard;
