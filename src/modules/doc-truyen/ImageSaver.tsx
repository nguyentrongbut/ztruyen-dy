'use client';

// ** React
import { useCallback, useEffect, useRef } from 'react';

import { historyService } from '@/utils/localStorage/historyService';

interface IImageSaverProps {
    chapter_id: string;
    slug: string;
    path: string;
    name: string;
    image: string;
    chapter_name: string;
}

const ImageSaver = ({
   chapter_id, slug, name,
    image, path, chapter_name
}: IImageSaverProps) => {
    const scrollY = useRef(0);

    // Restore scroll
    useEffect(() => {
        try {
            const item = historyService.getById(chapter_id);
            if (!item?.position) return;

            let tries = 0;
            const restoreScroll = () => {
                if (document.body.scrollHeight > item.position || tries > 60) {
                    window.scrollTo(0, item.position);
                    return;
                }
                tries++;
                requestAnimationFrame(restoreScroll);
            };

            requestAnimationFrame(restoreScroll);
        } catch {}
    }, [chapter_id]);

    // Track scroll
    useEffect(() => {
        const track = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', track, { passive: true });
        return () => window.removeEventListener('scroll', track);
    }, []);

    // Save history
    const saveHistory = useCallback(() => {
        if (scrollY.current <= 0) return;

        const historyItem: IHistory = {
            _id: chapter_id,
            slug,
            image,
            chapter: chapter_name.toString(),
            name,
            path,
            position: scrollY.current,
        };

        historyService.save(historyItem);
    }, [chapter_id, slug, chapter_name, name, path, image]);

    // Save on navigation
    useEffect(() => {
        return () => {
            saveHistory();
        };
    }, [saveHistory]);

    // Save on beforeunload
    useEffect(() => {
        window.addEventListener('beforeunload', saveHistory);
        return () => {
            window.removeEventListener('beforeunload', saveHistory);
        };
    }, [saveHistory]);

    return null;
};

export default ImageSaver;
