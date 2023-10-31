defmodule Game do
  import BlackJackGame
  import GameCoordinator
  import Player
  import Dealer

  GameCoordinator.start_game()
end
