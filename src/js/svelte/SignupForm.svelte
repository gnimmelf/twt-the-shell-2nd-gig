<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label {
        margin: 5px;
        width: 80%;
    }
    input[type="text"] {
        width: 90%;
    }
    p {
        margin: 10px 0px;
    }        
</style>

<script>
    export let title = "Signup Daily digest";
    export let emailLabel = "E-mail";
    export let nameLabel = "Name";
    export let consentText = "I agree to receive this newsletter and know that I can easily unsubscribe at any time";
    export let buttonLabel = "Submit";
    export let domain = location.hostname;
    export let url = "https://enuw8ipjnlyrzgc.m.pipedream.net";

    console.info("Domain:", domain);
    if (!domain.trim() || domain === 'localhost') {
        throw new Error(`Domain cannot be '${domain}'!`);
    }

    let promise;
    let email = "";
    let name = "";
    let consent;
    let errors = ["initial"];
    let valids = [];

    const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const namePattern = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u);

    const validate = function() {
        errors = [];
        (email.trim().length) && (emailPattern.test(email) ? valids : errors).push('email');
        (name.trim().length) && (namePattern.test(name) ? valids : errors).push('name');        
        (!consent) && errors.push("consent");
        console.log('Validate', { errors, valids });
        return !errors.length;
    };

    const signUp = async function() {
        if (!validate()) {
            return;
        }

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailAddress: email,
                recipientName: name,
                domain: domain,
            })
        });

        try {
            return await res.json();
        } catch {
            const message = res.text();
            return {
                statusCode: 400,
                message,                
            };
        };
    };

    const handleSubmit = () => {
        promise = signUp();
    }

    const reset = () => promise = null;
</script>

<section class="form">
    {#if !promise}

        {#if title}
            <h2>{title}</h2>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit}>

            <label>
                <span class="required">*</span>
                <input 
                    type="text" 
                    bind:value={email} 
                    on:input={validate}
                    class:error={~errors.indexOf('email')} 
                    class:ok={~valids.indexOf('email')}
                    placeholder={emailLabel} 
                />
            </label>

            <label>
                <span class="required">*</span>
                <input
                    type="text"
                    bind:value={name}
                    on:input={validate}
                    class:error={~errors.indexOf('name')}
                    class:ok={~valids.indexOf('name')}
                    placeholder={nameLabel}
                />
            </label>

            <label>
                <span class="required">*</span>
                <input
                    type="checkbox"
                    bind:checked={consent}
                    on:change={validate}
                    class:error={~errors.indexOf('consent')}
                />
                {consentText}.
            </label>

            <button disabled={errors.length} type="submit">{buttonLabel}</button>

        </form>
    {:else}
        <div class="feedback">
            {#await promise}
                <p class="processing">Please wait...</p>
            {:then data}
                <div 
                    class:error={data.statusCode!==200}
                    class:success={data.statusCode===200}
                >
                    {#if data.member}
                        <p>{data.member.address}</p>
                    {/if}

                    <p>{data.message}</p>
                    
                    {#if data.statusCode === 200}
                        <p>Thank you for registering.</p>               
                    {/if}

                </div>

                {#if data.statusCode !== 200}
                    <p><button on:click={reset}>Try again</button></p>
                {/if}

            {:catch error}
                <p class="error">{error.message}</p>
                <p><button on:click={reset}>Please try again later</button></p>
            {/await}
        </div>
    {/if}

</section>
