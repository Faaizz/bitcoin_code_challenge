<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Http\Controllers\DataController;

class DataControllerTest extends TestCase
{
    /**
     * Test Bitcoin Route
     *  Expect success when proper arguments are passed
     * @return void
     */
    public function testBitcoinRoute1()
    {
        $response = $this->postJson('/api/bitcoin', 
                        [   "from" => "2020-11-10",
                            "to" => "2020-12-01"
                        ]
                    );

        $response->assertStatus(200);
    }

    /**
     * Test Bitcoin Route
     *  Expect failure when one argument is omitted
     * @return void
     */
    public function testBitcoinRoute2()
    {
        $response = $this->postJson('/api/bitcoin', 
                        [   "from" => "2020-11-10"
                        ]
                    );

        $response->assertStatus(400);
    }

    /**
     * Test Bitcoin Route
     *  Expect failure when both arguments are omitted
     * @return void
     */
    public function testBitcoinRoute3()
    {
        $response = $this->postJson('/api/bitcoin', 
                        []
                    );

        $response->assertStatus(400);
    }

    /**
     * Test Fallback Route
     *  Expect 404 if not-existent route is specified
     * @return void
     */
    public function testBitcoinRoute4()
    {
        $response = $this->get('/api/bitcoinssss');

        $response->assertStatus(404);
    }


}
