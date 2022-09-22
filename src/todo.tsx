import React from 'react';
import { Checkbox, AnchorButton } from "@blueprintjs/core";
import { useState } from "react";

async function toggleCompleted(id: number) {
    const url = `http://localhost:8000/toggle_todo/${id}`;
    const response = await fetch(url, { method: 'POST' });
    return response;
}

function TodoItem({ id, text, completed }: { id: number, text: string, completed: boolean }) {
    const [completedState, setCompleted] = useState(completed);

    let textComponent = null;
    if (completedState) {
        textComponent = <s>{text}</s>;
    } else {
        textComponent = text;
    }

    const item = (
        <>
            <Checkbox
                checked={completedState}
                onChange={
                    (_) => {
                        setCompleted(c => !c);
                        toggleCompleted(id);
                    }}>
                {textComponent}
            </Checkbox>
            <AnchorButton text="Remove" intent="danger" onClick={
                (_) => {

                }
            } />
        </>
    );
    return item;
}

export default TodoItem;
