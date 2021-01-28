import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { IconBaseProps } from 'react-icons';
import { Container, Error } from './styles';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name ,icon: Icon, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setisFilled] = useState(false);

    const { fieldName, error, defaultValue, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    },[])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setisFilled(!!inputRef.current?.value)
    },[])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    },[fieldName, registerField])

    return (
        <Container isErrored={!!error} isFilled={isFilled} isfocused={isFocused} >
            { Icon && <Icon size={20} /> }
            <input 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue} 
                ref={inputRef} 
                {...rest} 
            />

            {error && 
            <Error title={error}> 
                <FiAlertCircle color="#c53030" size={20} />
            </Error>}
        </Container>
    )
}
export default Input;