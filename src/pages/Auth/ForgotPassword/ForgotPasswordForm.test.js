import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ForgotPasswordForm from './index';
import '@testing-library/jest-dom';

describe("Forgot Password form test", () => {

    test("should render title", () => {
        const showEmailSent = false;
        render(<ForgotPasswordForm showEmailSent={showEmailSent} title="oneTitle"/>)
        
        const titleElement = screen.getByTitle(/oneTitle/i)
        expect(titleElement).toBeInTheDocument()

    });
})
