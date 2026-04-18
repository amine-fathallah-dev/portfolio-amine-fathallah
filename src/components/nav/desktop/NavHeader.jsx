import "./NavHeader.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import ImageView from "/src/components/generic/ImageView.jsx"
import StatusBadge from "/src/components/generic/StatusBadge.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

const CV_URLS = { en: '/cv/CV_AFA_EN.pdf', fr: '/cv/CV_AFA_FR.pdf' }

function NavHeader({ shrink }) {
    const utils = useUtils()
    const {getTranslation, selectedLanguageId, getString} = useLanguage()
    const {getSettings} = useData()

    const settings = getSettings()

    const profile = settings.profile
    const stylizedName = utils.parseJsonText(profile["stylizedName"])
    const role = utils.parseJsonText(getTranslation(profile["locales"], "role"))
    const pfpUrl = utils.resolvePath(profile["profilePictureUrl"])
    const logoUrl = utils.resolvePath(profile["logoUrl"])

    const status = settings.status
    const statusVisible = status['visible']
    const statusAvailable = status['available']
    const statusMessage = getTranslation(status['locales'], 'message')

    const cvUrl = CV_URLS[selectedLanguageId] || CV_URLS['en']

    return (
        <header className={`nav-header ${shrink ? "nav-header-shrink" : ""}`}>
            <div className={`avatar-wrapper`}>
                <ImageView src={pfpUrl}
                           className={`img-view-avatar`}
                           alt={name}/>

                {statusVisible && (
                    <StatusBadge available={statusAvailable}
                             message={statusMessage}
                             smallMode={shrink}/>
                )}
            </div>

            <div className={`info mt-3 text-center`}>
                <h5 className={`name`}>
                    <ImageView src={logoUrl}
                               alt={`logo`}
                               className={`img-view-logo me-1`}/>

                    <span dangerouslySetInnerHTML={{__html:stylizedName}}/>
                </h5>

                <div className={`role`}>
                    <span>{role}</span>
                </div>

                {!shrink && (
                    <a href={cvUrl} download className={`cv-download-btn btn btn-highlight btn-sm mt-3`}>
                        <FaIcon iconName={`fa-solid fa-file-arrow-down`}/>
                        {getString('download_cv')}
                    </a>
                )}
            </div>
        </header>
    )
}

export default NavHeader