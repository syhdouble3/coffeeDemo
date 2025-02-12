/// <reference types="vite/client" />

declare module 'antd/es/form' {
    import { FormProps } from 'antd';
    const Form: React.FC<FormProps> & {
        Item: React.FC<{
            name?: string;
            rules?: Array<{
                required?: boolean;
                message?: string;
            }>;
            children?: React.ReactNode;
        }>;
        useForm: () => [
            {
                getFieldsValue: () => Record<string, unknown>;
                setFieldsValue: (values: Record<string, unknown>) => void;
                validateFields: () => Promise<Record<string, unknown>>;
                resetFields: () => void;
            }
        ];
    };
    export default Form;
}

declare module 'antd/es/input' {
    import { InputProps } from 'antd';
    const Input: React.FC<InputProps> & {
        Password: React.FC<InputProps>;
    };
    export default Input;
}

declare module 'antd/es/button' {
    import { ButtonProps } from 'antd';
    const Button: React.FC<ButtonProps>;
    export default Button;
}

declare module 'antd/es/message' {
    const message: {
        success: (content: string) => void;
        error: (content: string) => void;
        useMessage: () => [
            {
                success: (content: string) => void;
                error: (content: string) => void;
            },
            React.ReactElement
        ];
    };
    export default message;
}

declare module 'antd/es/card' {
    import { CardProps } from 'antd';
    const Card: React.FC<CardProps>;
    export default Card;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

declare module '*.gif' {
    const content: string;
    export default content;
}
