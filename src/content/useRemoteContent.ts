import { useEffect, useState } from 'react';
import { getActiveRemoteContent, refreshRemoteContent, subscribeRemoteContent, type RemoteContent } from './remote';

export function useRemoteContent(): RemoteContent {
    const [content, setContent] = useState(getActiveRemoteContent);

    useEffect(() => subscribeRemoteContent(setContent), []);

    useEffect(() => {
        refreshRemoteContent();
    }, []);

    return content;
}
