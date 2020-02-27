const mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g,"")
        return value = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value/100)
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g,"")
        if (value.length > 14) value = value.slice(0, -1)
        if (value.length > 11 || value.length == 14) {
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
        } else if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        } else {
        }
        return value
    },
    cep(value) {
        value = value.replace(/\D/g,"")
        if (value.length > 8) value = value.slice(0, -1)
        value = value.replace(/(\d{5})(\d)/, "$1-$2")
        return value
    }
}

const validate = {
    apply(input, func) {
        validate.clearErrors(input)
        let results = validate[func](input.value)
        input.value = results.value
        if (results.error) validate.displayError(input, results.error)
    },
    displayError(input, error) {
        const div = document.createElement("div")
        div.classList.add("mail-error")
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".mail-error")
        if (errorDiv) errorDiv.remove()
    },
    isEmail(value) {
        let error = null
        const mailFormat = /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value.match(mailFormat)) error = "Email inválido"
        return {error, value}
    },
    isCpfCnpj(value) {
        let error = null
        const cleanValues = value.replace(/\D/g, "")
        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = "CNPJ inválido"
        } else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF inválido"
        }
        return {error, value}
    },
    isCep(value) {
        let error = null
        const cleanValues = value.replace(/\D/g, "")
        if (cleanValues.length !== 8) error = "CEP inválido"
        return {error, value}
    },
    allFields(event) {
        const items = document.querySelectorAll(".item input, .item select, .item textarea")
        for (item in items) {
            if (item.value == "") {
                const message = document.createElement("div")
                message.classList.add("error-message")
                message.innerHTML = "Por favor, preencha todos os campos."
                document.querySelector("body").append(message)
                event.preventDefault()         
            }
        }
    }
}

const photosUpload = {
    input: "",
    preview: document.querySelector(".image-preview"),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const {files: fileList} = event.target
        photosUpload.input = event.target
        if (photosUpload.hasLimit(event)) return
        Array.from(fileList).forEach(file => {
            photosUpload.files.push(file)
            const reader = new FileReader()
            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)
                const div = photosUpload.getContainer(image)
                photosUpload.preview.appendChild(div)
            }
            reader.readAsDataURL(file)
        })
        photosUpload.input.files = photosUpload.getAllFiles()
    },
    hasLimit(e) {
        const {uploadLimit, input, preview} = photosUpload
        const {files: fileList} = input
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        const imageDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "image") {
                imageDiv.push(item)
            }
        })
        const totalImages = fileList.length + imageDiv.length
        if (totalImages > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
        photosUpload.files.forEach(file => dataTransfer.items.add(file))
        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement("div")
        div.classList.add("image")
        div.onclick = photosUpload.removeImage
        div.appendChild(image)
        div.appendChild(photosUpload.getRemoveButton())
        return div
    },
    getRemoveButton() {
        const button = document.createElement("i")
        button.classList.add("material-icons")
        button.innerHTML = "close"
        return button
    },
    removeImage(event) {
        const imageDiv = event.target.parentNode
        const photosArray = Array.from(photosUpload.preview.children)
        const index = photosArray.indexOf(imageDiv)
        photosUpload.files.splice(index, 1)
        photosUpload.input.files = photosUpload.getAllFiles()
        imageDiv.remove()
    },

    removeOldImage(event) {
        const imageDiv = event.target.parentNode
        if (imageDiv.id) {
            const removedFiles = document.querySelector("input[name='removed_files'")
            if (removedFiles) {
                removedFiles.value += `${imageDiv.id},`
            }
        }
        imageDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector(".gallery-highlight > img"),
    previews: document.querySelectorAll(".gallery-preview img"),
    setImage(event) {
        const {target} = event
        ImageGallery.previews.forEach(preview => preview.classList.remove("active-image"))
        target.classList.add("active-image")
        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    element: document.querySelector(".lightbox-gallery"),
    image: document.querySelector(".lightbox-gallery img"),
    closeButton: document.querySelector(".lightbox-close"),
    open() {
        Lightbox.element.style.top = 0
        Lightbox.element.style.opacity = 1
        Lightbox.closeButton.style.opacity = 1
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.element.style.opacity = 0
        Lightbox.element.style.top = "-100%"
        Lightbox.closeButton.style.opacity = 0
        Lightbox.closeButton.style.top = "-80px"
    }
}