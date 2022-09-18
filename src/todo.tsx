import React from 'react';
import { Checkbox } from "@blueprintjs/core";
import { useState } from "react";

function TodoItem({ text, completed }: { text: String, completed: boolean }) {
    const [completedState, setCompleted] = useState(completed);

    const item = (
        <Checkbox checked={completedState} onChange={(_) => setCompleted(c => !c)}>
            {text}
        </Checkbox>
    );
    return item;
}

export default TodoItem;
