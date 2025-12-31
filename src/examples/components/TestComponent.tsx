type Props = {
    wordToAdd: string;
};

export const TestComponent = (props: Props) => {
    return (
        <>
            <h1>TestComponent</h1>
            <p>{props.wordToAdd}</p>
        </>
    );
};
