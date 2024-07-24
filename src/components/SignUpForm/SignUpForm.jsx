const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function SignUpForm() {
    return (
        <form autoComplete="off">
            <input type="text" name="name" />
            <input type="text" name="email" />
            <input type="password" name="password" min={6} />
            <input type="text" name="teacherId" />
        </form>
    );
}
