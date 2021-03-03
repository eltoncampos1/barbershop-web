import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Header = styled.header`
    padding: 32px;
    background: #28263e;
`;
export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;
    }

    svg {
        color: #999591;
        width: 20px;
        height: 20px;
    }
`;
export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: #f4ede8;
        }

        strong {
            color: #f49000;
        }
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color: #ff9000;
        display: flex;
        align-items: center;
    }

    span {
        display: flex;
        align-items: center;
    }

    span + span::before {
        content: '';
        width: 1px;
        height: 12px;
        background: #ff9000;
        margin: 0 8px;
    }
`;

export const NextAppointment = styled.div`
    
`;


export const Calendar = styled.aside`
    width: 380px;
`;
