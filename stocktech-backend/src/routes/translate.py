from src.models.translate import TranslateSchema
from fastapi import HTTPException, APIRouter
from fastapi.responses import StreamingResponse
from translate import Translator as TranslateLib
from gtts import gTTS
import io

router = APIRouter(prefix='/lang', tags=['translate'])

@router.post("/translate")
async def translate_text(payload: TranslateSchema):
    """
    Translates the given text to the target language.

    Parameters:
        payload (TranslateSchema): The payload containing the text to be translated and the target language.

    Returns:
        dict: A dictionary containing the translated text.
    Raises:
        HTTPException: If there is an error in the translation process.
    """
    try:
        chunk_size = 500
        if len(payload.message) > chunk_size:
            chunks = [payload.message[i:i+chunk_size] for i in range(0, len(payload.message), chunk_size)]
            translated_chunks = []
            translator = TranslateLib(to_lang=payload.target_language)

            for chunk in chunks:
                translated_chunk = translator.translate(chunk)
                translated_chunks.append(translated_chunk)

            translated_text = ''.join(translated_chunks)

            return {"translation": translated_text}
        else:
            translator = TranslateLib(to_lang=payload.target_language)
            translated_text = translator.translate(payload.message)
            return {"translation": translated_text}
    except StopIteration as e:
        raise HTTPException(status_code=500, detail=f"Translation error: {str(e)}")
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation error: {str(e)}")
    
@router.post("/voice_assistant")
async def voice_assist(payload: TranslateSchema):
    """
    Endpoint for voice assistant.
    
    Args:
        payload (TranslateSchema): The payload containing the message and target language.
        
    Returns:
        StreamingResponse: The response containing the audio stream of the generated speech.
        
    Raises:
        HTTPException: If there is an error during the process.
    """
    try:
        tts = gTTS(payload.message, lang=payload.target_language)
        audio_stream = io.BytesIO()
        tts.save(audio_stream)
        audio_stream.seek(0)
        return StreamingResponse(io.BytesIO(audio_stream.read()), media_type="audio/mpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))