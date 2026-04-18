import {createContext, useContext, useState} from 'react'

const FeedbacksContext = createContext(null)
export const useFeedbacks = () => useContext(FeedbacksContext)

export const FeedbacksProvider = ({children}) => {
    const [spinnerActivities, setSpinnerActivities] = useState([])
    const [displayingNotification, setDisplayingNotification] = useState(null)
    const [displayingYoutubeVideo, setDisplayingYoutubeVideo] = useState(null)
    const [displayingGallery, setDisplayingGallery] = useState(null)
    const [pendingConfirmation, setPendingConfirmation] = useState(null)

    // SPINNER...
    const showActivitySpinner = (activityId, message) => {
        if(spinnerActivities.find(activity => activity.id === activityId))
            return

        const data = { id: activityId, message: message }
        setSpinnerActivities(prevActivities => [...prevActivities, data])
    }

    const isShowingSpinner = () => {
        return spinnerActivities.length
    }

    const listSpinnerActivities = () => {
        return spinnerActivities
    }

    const hideActivitySpinner = (activityId) => {
        setSpinnerActivities(prevActivities =>
            prevActivities.filter(activity => activity.id !== activityId)
        )
    }

    // NOTIFICATIONS...
    const displayNotification = (type, title, message) => {
        setDisplayingNotification({
            type: type,
            title: title,
            message: message
        })
    }

    const killNotification = () => {
        setDisplayingNotification(null)
    }

    // YOUTUBE VIDEOS...
    const displayYoutubeVideo = (url, title, description) => {
        setDisplayingYoutubeVideo({
            url: url,
            title: title,
            description: description
        })
    }

    const hideYoutubeVideo = () => {
        setDisplayingYoutubeVideo(null)
    }

    const showConfirmationDialog = (title, message, cancelButtonLabel, confirmButtonLabel, onConfirm) => {
        setPendingConfirmation({
            title: title,
            message: message,
            cancelButtonLabel: cancelButtonLabel,
            confirmButtonLabel: confirmButtonLabel,
            onConfirm: onConfirm
        })
    }

    const hideConfirmationDialog = () => {
        setPendingConfirmation(null)
    }

    // GALLERY...
    const displayGallery = (screenshots, aspectRatio, title, description) => {
        setDisplayingGallery({
            screenshots: screenshots,
            aspectRatio: aspectRatio,
            title: title,
            description: description
        })
    }

    const hideGallery = () => {
        setDisplayingGallery(null)
    }

    return (
        <FeedbacksContext.Provider value={{
            isShowingSpinner,
            listSpinnerActivities,
            showActivitySpinner,
            hideActivitySpinner,

            displayingNotification,
            displayNotification,
            killNotification,

            displayingYoutubeVideo,
            displayYoutubeVideo,
            hideYoutubeVideo,

            displayingGallery,
            displayGallery,
            hideGallery,

            pendingConfirmation,
            showConfirmationDialog,
            hideConfirmationDialog,
        }}>
            {children}
        </FeedbacksContext.Provider>
    )
}