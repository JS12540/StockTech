import * as React from 'react';
import { Link, Typography } from '@mui/material';

/**
 * Renders a copyright notice.
 *
 * @param {any} props - The props object.
 * @return {ReactElement} The copyright notice component.
 */
export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Your Website
            </Link>{' '}
            {2023}
            {'.'}
        </Typography>
    );
}
