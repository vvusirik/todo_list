import React, { useEffect } from 'react';
import { Checkbox, AnchorButton, EditableText } from "@blueprintjs/core";
import { useState } from "react";
import { Flex, Spacer, HStack } from '@chakra-ui/react';
import { put, delete_ } from './utils'
import './todo.css';


async function updateText(id: number, text: string) {
    const url = `http://localhost:8000/update_todo/${id}`;
    const response = await put(url, { text: text });
    return response;
}

async function updateCompleted(id: number, completed: boolean) {
    const url = `http://localhost:8000/update_todo/${id}`;
    const response = await put(url, { completed: completed });
    return response;
}

async function deleteTodo(id: number) {
    const url = `http://localhost:8000/delete_todo/${id}`;
    const response = await delete_(url);
    console.log(response);
    return response;
}

function TodoItem({ id, text, completed }: { id: number, text: string, completed: boolean }) {
    const [completedState, setCompleted] = useState(completed);
    const [textState, setText] = useState(text);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => { updateCompleted(id, completedState); }, [completedState]);
    useEffect(() => { updateText(id, textState); }, [textState]);


    let textComponent = null;
    if (completedState) {
        textComponent = <s>{textState}</s>;
    } else {
        textComponent = <EditableText defaultValue={textState} onConfirm={(newText) => setText(newText)} maxLength={100} />;
    }

    if (!shouldRender) {
        return <></>;
    }
    const item = (
        <HStack spacing='8px'>
            <AnchorButton intent="danger" icon="remove" onClick={(_) => {
                deleteTodo(id);
                setShouldRender(false);
            }} />
            <Checkbox
                checked={completedState}
                onChange={
                    (_) => {
                        setCompleted(c => !c);
                    }}>
            </Checkbox>
            {textComponent}
        </HStack>
    );
    return item;
}

export default TodoItem;
