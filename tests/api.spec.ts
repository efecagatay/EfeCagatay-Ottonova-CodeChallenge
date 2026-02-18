import {test , request, expect } from '@playwright/test'


test.describe('PokeAPI Backend Tests' , () => {
    const POKE_API = {
    BASE_URL: 'https://pokeapi.co/api/v2',
    POKEMON: '/pokemon'
    };

    test('GET Pikachu Data', async ({request}) =>{
    const response = await request.get(`${POKE_API.BASE_URL}${POKE_API.POKEMON}/pikachu`);        
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('pikachu');
    const lightningRodAbility = body.abilities.find(
        item => item.ability.name === 'lightning-rod'
    );
    expect(lightningRodAbility).toBeDefined();
    expect(lightningRodAbility.ability.name).toBe('lightning-rod');


    })


    test('Modify Charmander Response to 404', async ({ page,request }) => {
        await page.route('**/api/v2/pokemon/charmander', async (route) => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({ message: "Mocked: Not Found" })
            });
        });
        const response = await page.goto('https://pokeapi.co/api/v2/pokemon/charmander');
        expect(response?.status()).toBe(404);
        console.log("Charmander successfully mocked to 404!");
    });


})