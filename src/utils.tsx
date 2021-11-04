type ParseResult<T> =
| { parsed: T; hasError: false; error?: undefined }
| { parsed?: undefined; hasError: true; error?: unknown }

class Utils {
    static parseJson<T>(guard: (o: any) => o is T) {
        return (text: string): ParseResult<T> => {
            const parsed = JSON.parse(text);
            return guard(parsed) ? { parsed, hasError: false } : { hasError: true };
        };
    }
}

export default Utils;
